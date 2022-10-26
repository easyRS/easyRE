const { createServer } = require('http'); /* eslint-disable-line*/
const { parse } = require('url'); /* eslint-disable-line*/
const next = require('next'); /* eslint-disable-line*/

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(
    async (
      req: { url: any },
      res: { statusCode: number; end: (arg0: string) => void }
    ) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        if (req.url !== undefined) {
          const parsedUrl = parse(req.url, true);
          const { pathname, query } = parsedUrl;

          if (pathname === '/a') {
            await app.render(req, res, '/a', query);
          } else if (pathname === '/b') {
            await app.render(req, res, '/b', query);
          } else {
            await handle(req, res, parsedUrl);
          }
        }
      } catch (err) {
        // console.error('Error occurred handling', req.url, err)
        res.statusCode = 500;
        res.end('internal server error');
      }
    }
  ).listen(port, () => {
    // console.log(`> Ready on http://${hostname}:${port}`)
  });
});
