import baseHtml from './base-html';

export default function (req, res) {
  res.header('Cache-Control', 'public, max-age=86400');
  res.end(baseHtml('',null));
}
