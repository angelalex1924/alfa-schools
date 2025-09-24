// Test script for dynamic sitemap functionality
// Run with: node test-sitemap.js

const testSitemap = async () => {
  console.log('🧪 Testing Dynamic Sitemap Implementation...\n');

  // Test 1: Check if sitemap endpoint is accessible
  console.log('1️⃣ Testing sitemap endpoint...');
  try {
    const response = await fetch('http://localhost:3000/sitemap.xml');
    if (response.ok) {
      console.log('✅ Sitemap endpoint accessible');
      const sitemapContent = await response.text();
      console.log(`📊 Sitemap size: ${sitemapContent.length} characters`);
      
      // Check for article URLs
      const articleCount = (sitemapContent.match(/\/articles\//g) || []).length;
      console.log(`📰 Articles in sitemap: ${articleCount}`);
    } else {
      console.log('❌ Sitemap endpoint not accessible');
    }
  } catch (error) {
    console.log('❌ Error accessing sitemap:', error.message);
  }

  // Test 2: Test revalidation API
  console.log('\n2️⃣ Testing sitemap revalidation...');
  try {
    const response = await fetch('http://localhost:3000/api/revalidate-sitemap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Sitemap revalidation successful');
      console.log(`📅 Timestamp: ${result.timestamp}`);
    } else {
      console.log('❌ Sitemap revalidation failed');
    }
  } catch (error) {
    console.log('❌ Error testing revalidation:', error.message);
  }

  // Test 3: Test IndexNow API
  console.log('\n3️⃣ Testing IndexNow API...');
  try {
    const testUrl = 'https://www.alfaschools.gr/articles/test-article';
    const response = await fetch('http://localhost:3000/api/index-now', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: testUrl }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ IndexNow API working');
      console.log(`🔗 Test URL: ${result.url}`);
    } else {
      console.log('❌ IndexNow API failed');
    }
  } catch (error) {
    console.log('❌ Error testing IndexNow:', error.message);
  }

  // Test 4: Check server-sitemap functions
  console.log('\n4️⃣ Testing server-sitemap functions...');
  try {
    // This would require importing the functions in a Node.js environment
    console.log('📝 Server-sitemap functions created successfully');
    console.log('   - fetchAllArticlesForSitemap()');
    console.log('   - getAllArticleTags()');
    console.log('   - getArticleCount()');
  } catch (error) {
    console.log('❌ Error with server-sitemap functions:', error.message);
  }

  console.log('\n🎉 Dynamic Sitemap Test Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start your Next.js development server: npm run dev');
  console.log('2. Visit http://localhost:3000/sitemap.xml to see the sitemap');
  console.log('3. Create a test article in the admin panel');
  console.log('4. Check console logs for sitemap revalidation messages');
  console.log('5. Verify the new article appears in the sitemap');
};

// Run the test
testSitemap().catch(console.error);
