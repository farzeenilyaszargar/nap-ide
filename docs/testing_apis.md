# Testing Backend APIs

Since your APIs are protected by authentication, the easiest way to test them is using the **Browser Console** while logged into your application. This ensures your requests are authenticated with your active session.

## 1. Test Usage Tracking (`/api/usage`)

This endpoint increments your `tokens_used` and `requests_count`.

**Steps:**
1. Navigate to your [Dashboard](http://localhost:3000/dashboard).
2. Open Developer Tools (Cmd+Option+J on Mac, Ctrl+Shift+J on Windows).
3. Paste and run the following code:

```javascript
fetch('/api/usage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    tokens: 50 // Simulate using 50 tokens
  })
})
.then(res => res.json())
.then(data => {
  console.log('Response:', data);
  if(data.success) {
    console.log('✅ Usage updated!');
    // Reload page to see changes in the dashboard
    window.location.reload(); 
  } else {
    console.error('❌ Error:', data.error);
  }
});
```

**Expected Result:**
- The console should log `✅ Usage updated!`.
- The page will reload.
- Your "Tokens Used" bar and "Daily Token Usage" chart should increase by 50.

---

## 2. Test Detailed Usage Logging (`/api/usage/report`)

This endpoint logs detailed usage metadata to `usage_logs` and updates the total `tokens_used`.

**Steps:**
1. Run this in the console:

```javascript
fetch('/api/usage/report', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    endpoint: 'test-ai-model',
    tokens: 120,
    metadata: { model: 'gpt-4', prompt_length: 20 }
  })
})
.then(res => res.json())
.then(data => {
  console.log('Response:', data);
  if(data.success) {
    console.log('✅ Report logged!');
    window.location.reload();
  } else {
    console.error('❌ Error:', data);
  }
});
```

**Expected Result:**
- Console logs `✅ Report logged!`.
- Dashboard reloads.
- Tokens used increases by 120.

---

## 3. Test Razorpay Webhook (Simulator)

Since webhooks come from external servers, you can't test them effortlessly from the browser. You should use the `scripts/test-razorpay-webhook.js` we created earlier for valid signature testing.

Running the script from your terminal:
```bash
node scripts/test-razorpay-webhook.js
```
