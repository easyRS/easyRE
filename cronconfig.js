const { exec } = require('child_process');

exec('cd && /usr/sbin/crond -d8', (error, stdout, stderr) => {
  if (error) {
    // console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    // console.log(`stderr: ${stderr}`);
  }
  // console.log(`stdout: ${stdout}`);
});
