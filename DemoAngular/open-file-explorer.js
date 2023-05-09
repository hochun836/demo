const args = process.argv.slice(2);
let path = args[0];

if (!path) {
  console.error("No specified path");
  return;
}

switch (require(`os`).platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
  case `win`:
      path = path.replace(/\//g, '\\');
      require('child_process').exec(`start ${path}`);
      break;
  case `linux`:
  case `macos`:
      break;
}
