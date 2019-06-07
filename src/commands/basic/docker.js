'use strict';

import chalk from 'chalk';
import execa from 'execa';
import showBanner from 'node-banner';

import { checkIfConfigFileExists } from '../../utils/messages';
import Spinner from '../../utils/spinner';
import { isWin } from '../../utils/constants';
import { validateInstallation } from '../../utils/validate';

const dockerize = async () => {
  await showBanner();
  checkIfConfigFileExists();
  await validateInstallation('docker');

  const spinner = new Spinner(
    'Sit back and relax while we set things up for you',
  );
  spinner.start();
  try {
    if (!isWin) {
      await execa.shell('sudo docker-compose up', { stdio: 'inherit' });
    } else {
      await execa.shell('docker-compose up', { stdio: 'inherit' });
    }
  } catch (err) {
    spinner.fail('Something went wrong');
    throw err;
  }

  spinner.succeed('You are all set');
  console.log(
    chalk.green.bold(
      '\n Services:\n server:- localhost:9000\n client:- localhost:8080',
    ),
  );
};

module.exports = dockerize;
