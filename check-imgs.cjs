const https = require('https');

const ids = [
  '1600271886742-f049cd451b66', // juice
  '1518635017498-87f514b751ba', // strawberry
  '1519689680058-324335c77eba', // baby
  '1620916566398-39f1143ab7be', // cosmetics
  '1621506289937-a8e4df240d0b', // chips
  '1584308666744-247b15090fce', // diaper
  '1571212726588-e9faffb4549f', // baby bottle
  '1608248543803-ba4f8c70ae0b', // snacks
  '1550989460-0adf9ea622e2', // grocery
];

async function check() {
  for (const id of ids) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`;
    await new Promise(resolve => {
      https.get(url, (res) => {
        console.log(`${id}: ${res.statusCode}`);
        resolve();
      }).on('error', (e) => {
        console.log(`${id}: ERROR ${e.message}`);
        resolve();
      });
    });
  }
}

check();
