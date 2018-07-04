# http module for browser and nodejs

## Usage

### Browser
```html
<script src="/dist/index.js"></script>
<script type="text/javascript" async>
this.http = new Http();
(async function fetchData() {
	const options = {
		endpoint: 'https://www.google.com',
		additional_headers: [{ 'content-type': 'application/json' }]
	};
	return await http.get(options);
})();
</script>
```

### NodeJs
To install:
```bash
npm install git+https://github.com/PANDYA21/httprequestor.git --save
```

Require and usage:
```javascript
const Http = require('.');
const http = new Http();

async function fetchData() {
	const options = {
		endpoint: 'https://www.google.com',
		additional_headers: [{ 'content-type': 'application/json' }]
	};
	return await http.get(options);
}

fetchData()
	.catch(console.error)
	.then(console.log);
```

