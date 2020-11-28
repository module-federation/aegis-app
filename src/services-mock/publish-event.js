import http from 'http';

export default function publishEvent(event) {
  if (!event) {
    return;
  }
  const serialized = JSON.stringify(event);

  const options = {
    hostname: 'localhost',
    port: 8060,
    path: '/api/publish',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(serialized)
    }
  }

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      // console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write(serialized);
  req.end();
}
