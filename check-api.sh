#!/bin/bash

# MetaPulse API Health Check Script
# Verifică dacă API-ul funcționează corect pe Railway

echo "🔍 MetaPulse API Health Check"
echo "=============================="

API_URL="https://metapulseapi-production.up.railway.app"

echo "📍 Testing API at: $API_URL"
echo ""

# Test 1: Health Check
echo "1️⃣ Testing Health Endpoint..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$API_URL/api/health")
HEALTH_CODE="${HEALTH_RESPONSE: -3}"
HEALTH_BODY="${HEALTH_RESPONSE%???}"

if [ "$HEALTH_CODE" = "200" ]; then
    echo "✅ Health Check: PASSED ($HEALTH_CODE)"
    echo "   Response: $HEALTH_BODY"
else
    echo "❌ Health Check: FAILED ($HEALTH_CODE)"
    echo "   Response: $HEALTH_BODY"
fi

echo ""

# Test 2: Status Endpoint
echo "2️⃣ Testing Status Endpoint..."
STATUS_RESPONSE=$(curl -s -w "%{http_code}" "$API_URL/api/health/status")
STATUS_CODE="${STATUS_RESPONSE: -3}"
STATUS_BODY="${STATUS_RESPONSE%???}"

if [ "$STATUS_CODE" = "200" ]; then
    echo "✅ Status Check: PASSED ($STATUS_CODE)"
    echo "   Response: $STATUS_BODY"
else
    echo "❌ Status Check: FAILED ($STATUS_CODE)"
    echo "   Response: $STATUS_BODY"
fi

echo ""

# Test 3: Test Connection
echo "3️⃣ Testing Connection Endpoint..."
TEST_RESPONSE=$(curl -s -w "%{http_code}" "$API_URL/api/health/test")
TEST_CODE="${TEST_RESPONSE: -3}"
TEST_BODY="${TEST_RESPONSE%???}"

if [ "$TEST_CODE" = "200" ]; then
    echo "✅ Connection Test: PASSED ($TEST_CODE)"
    echo "   Response: $TEST_BODY"
else
    echo "❌ Connection Test: FAILED ($TEST_CODE)"
    echo "   Response: $TEST_BODY"
fi

echo ""

# Test 4: User Endpoint (should return 404 for non-existent user)
echo "4️⃣ Testing User Endpoint..."
USER_RESPONSE=$(curl -s -w "%{http_code}" "$API_URL/api/users/telegram/999999999")
USER_CODE="${USER_RESPONSE: -3}"
USER_BODY="${USER_RESPONSE%???}"

if [ "$USER_CODE" = "404" ]; then
    echo "✅ User Endpoint: PASSED ($USER_CODE) - Correctly returns 404 for non-existent user"
elif [ "$USER_CODE" = "200" ]; then
    echo "⚠️  User Endpoint: PARTIAL ($USER_CODE) - Returns 200 (user might exist)"
else
    echo "❌ User Endpoint: FAILED ($USER_CODE)"
    echo "   Response: $USER_BODY"
fi

echo ""

# Summary
echo "📊 Summary"
echo "=========="
if [ "$HEALTH_CODE" = "200" ] && [ "$STATUS_CODE" = "200" ] && [ "$TEST_CODE" = "200" ]; then
    echo "🎉 API is working correctly!"
    echo "✅ All health checks passed"
    echo "🚀 Ready for production use"
else
    echo "⚠️  API has issues:"
    [ "$HEALTH_CODE" != "200" ] && echo "   - Health endpoint failed ($HEALTH_CODE)"
    [ "$STATUS_CODE" != "200" ] && echo "   - Status endpoint failed ($STATUS_CODE)"
    [ "$TEST_CODE" != "200" ] && echo "   - Connection test failed ($TEST_CODE)"
    echo ""
    echo "🔧 Troubleshooting steps:"
    echo "   1. Check Railway logs: railway logs --service api-service"
    echo "   2. Verify environment variables are set correctly"
    echo "   3. Check database connection"
    echo "   4. Ensure JWT_SECRET is configured"
fi

echo ""
echo "🔗 API Endpoints:"
echo "   Health: $API_URL/api/health"
echo "   Status: $API_URL/api/health/status"
echo "   Test:   $API_URL/api/health/test"
echo "   Users:  $API_URL/api/users/telegram/{telegramId}"
