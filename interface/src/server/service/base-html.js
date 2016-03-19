export default (componentHTML, initialState) => (`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <base href="/">

    <title>MyApp</title>
    <link rel='stylesheet' href='dist/app.css'>

  </head>
  <body>
    <div id="react-app">${componentHTML}</div>

    <script type="application/javascript">
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom.min.js"></script>

    <!-- load scripts -->
    <script>
      (function() {

        var loadScript = function(src, loadCallback) {
          var s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = src;
          s.onload = loadCallback;
          document.body.appendChild(s);
        };

        // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        if (isSafari || isOpera) {

          loadScript('//cdnjs.cloudflare.com/ajax/libs/es6-promise/3.0.2/es6-promise.min.js', function() {
            loadScript('//cdnjs.cloudflare.com/ajax/libs/fetch/0.10.1/fetch.min.js', function() {
              loadScript('dist/bundle.js');
            });
          });

        } else {
          loadScript('dist/bundle.js');
        }

      })();

    </script>

  </body>
</html>
`);
