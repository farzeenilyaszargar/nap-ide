import { redirect } from 'next/navigation'
import Image from 'next/image'

import { LogoutButton } from '@/components/logout-button'
import { UsageChart } from '@/components/usage-chart'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/header'


export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  // Get user metadata
  const fullName = user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User'
  const avatarUrl = user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null
  const provider = user.app_metadata?.provider || 'email'
  const createdAt = user.created_at
  const lastSignIn = user.last_sign_in_at

  // Format dates
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Calculate account age
  const getAccountAge = () => {
    if (!createdAt) return 'N/A'
    const created = new Date(createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''}`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''}`
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) !== 1 ? 's' : ''}`
  }

  // Fetch usage stats
  const { data: usage } = await supabase
    .from('user_usage')
    .select(`
      *,
      plans (
        name,
        token_limit,
        request_limit
      )
    `)
    .eq('user_id', user.id)
    .single()

  // Fetch Usage History (Last 7 Days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const { data: usageLogs } = await supabase
    .from('usage_logs')
    .select('created_at, tokens_used')
    .eq('user_id', user.id)
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: true });

  // Aggregate usage by date
  const usageMap = new Map<string, number>();

  // Initialize last 7 days with 0
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toLocaleDateString('en-US', { weekday: 'short' });
    // We strictly want the last 7 days order, so let's build the array later, just map here
    // actually, simpler to just Map<DateString, Total>
  }

  // Process logs
  if (usageLogs) {
    usageLogs.forEach((log: any) => {
      const date = new Date(log.created_at).toLocaleDateString('en-US', { weekday: 'short' });
      usageMap.set(date, (usageMap.get(date) || 0) + log.tokens_used);
    });
  }

  // Build final data array for chart (reversed to confirm chronological order if loop puts today first? 
  // No, let's construct explicit array of last 7 days from -6 to today)
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateKey = d.toLocaleDateString('en-US', { weekday: 'short' });
    chartData.push({
      date: dateKey,
      usage: usageMap.get(dateKey) || 0
    });
  }


  // Default values if no usage record exists
  const stats = {
    planName: usage?.plans?.name || 'Free',
    tokensUsed: usage?.tokens_used || 0,
    tokenLimit: usage?.plans?.token_limit || 1000,
    requestsUsed: usage?.requests_count || 0,
    requestLimit: usage?.plans?.request_limit || 100,
    expiry: usage?.plan_expiry_date,
    totalSpent: usage?.total_spent || 0
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6">
        {/* Header */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-200"
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200">
                  {fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-black mb-2">
                Welcome back, {fullName}!
              </h1>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {provider === 'google' ? 'Google' : provider === 'github' ? 'GitHub' : 'Email'}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  {stats.planName} Plan
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <div className="w-full sm:w-auto">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Subscription & Usage Stats */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-black mb-6">Subscription & Usage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visual Stats */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-500">Tokens Used</span>
                  <span className="text-black">{stats.tokensUsed.toLocaleString()} / {stats.tokenLimit.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min((stats.tokensUsed / stats.tokenLimit) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-500">Requests</span>
                  <span className="text-black">{stats.requestsUsed.toLocaleString()} / {stats.requestLimit.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${Math.min((stats.requestsUsed / stats.requestLimit) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 border-l pl-0 md:pl-8 border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current Plan</span>
                <span className="font-bold text-black">{stats.planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Valid Until</span>
                <span className="font-medium text-black">{formatDate(stats.expiry)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Spent</span>
                <span className="font-medium text-black">₹{(stats.totalSpent / 100).toFixed(2)}</span>
              </div>
              <div className="pt-4">
                <a href="/pricing" className="block w-full text-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm">
                  Upgrade Plan
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="w-full mb-6">
          <UsageChart
            title="Daily Token Usage"
            data={chartData}
            color="#3b82f6"
          />
        </div>

        {/* Existing Statistics Cards (Account Age, Last Sign In, Provider) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Account Age Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Account Age
              </h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-black">{getAccountAge()}</p>
            <p className="text-sm text-gray-500 mt-1">
              Since {formatDate(createdAt)}
            </p>
          </div>

          {/* Last Sign In Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Last Sign In
              </h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-black">
              {lastSignIn ? formatDate(lastSignIn) : 'Just now'}
            </p>
            <p className="text-sm text-gray-500 mt-1">Active session</p>
          </div>

          {/* Provider Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Auth Provider
              </h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-black capitalize">
              {provider}
            </p>
            <p className="text-sm text-gray-500 mt-1">Connected account</p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-black mb-6">Account Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">User ID</span>
              <span className="text-sm font-mono text-black break-all">
                {user.id.substring(0, 20)}...
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Email Verified</span>
              <span className={`font-medium ${user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}`}>
                {user.email_confirmed_at ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Account Created</span>
              <span className="text-black">{formatDate(createdAt)}</span>
            </div>
            {lastSignIn && (
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500">Last Active</span>
                <span className="text-black">{formatDate(lastSignIn)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
