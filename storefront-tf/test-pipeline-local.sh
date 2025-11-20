#!/bin/bash
set -e

echo "🚀 Testing Pipeline Locally..."

# 1. Test Docker Build
echo "🐳 Testing Docker build..."
cd ../my-medusa-store-storefront
docker build -t local-test-storefront .
echo "✅ Docker build successful"

# 2. Test Docker Run
echo "🐳 Testing Docker run..."
docker run -d -p 3000:3000 \
  --name test-storefront \
  -e BACKEND_URL="https://medusa-smileclinic.azurewebsites.net" \
  -e BRANDING_BLOB_URL="https://example.com/branding.json" \
  -e NEXT_PUBLIC_BACKEND="https://medusa-smileclinic.azurewebsites.net" \
  local-test-storefront

# Wait for app to start
sleep 10

# 3. Test Application
echo "🧪 Testing application..."
curl -f http://localhost:3000 || echo "⚠️ Application not responding yet"

# 4. Check logs
echo "📋 Checking container logs..."
docker logs test-storefront

# 5. Cleanup
echo "🧹 Cleaning up..."
docker stop test-storefront
docker rm test-storefront

echo "✅ Local Docker test completed!"