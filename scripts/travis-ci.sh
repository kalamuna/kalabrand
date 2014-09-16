#!/bin/bash

COMMAND=$1
EXIT_VALUE=0

##
# SCRIPT COMMANDS
##

# before-install
#
# Do some stuff before npm install
#
before-install() {
  echo
}

# before-script
#
# Install build dependencies
#
before-script() {
  npm install -g yo grunt-cli bower generator-style-prototype weinre
  gem install bundler
}

# script
#
# Run the tests.
#
script() {
  bundle install
  bower install
  grunt test
}

# after-script
#
# Clean up after the tests.
#
after-script() {
  echo
}

# after-success
#
# Deploy
#
after-success() {
  if [ $TRAVIS_BRANCH == "master" ] &&
     [ $TRAVIS_PULL_REQUEST == "false" ] &&
     [ $TRAVIS_REPO_SLUG == "kalamuna/kalabrand" ]; then
    grunt export
    chmod 600 $TRAVIS_BUILD_DIR/scripts/travis.id_rsa
    eval "$(ssh-agent)"
    ssh-add $TRAVIS_BUILD_DIR/scripts/travis.id_rsa
    mkdir $TRAVIS_BUILD_DIR/prod
    cd $TRAVIS_BUILD_DIR/prod
    git config --global user.name "Kala C. Bot"
    git config --global user.email kalacommitbot@kalamuna.com
    git clone ssh://codeserver.dev.a7751f9e-1630-48b1-9de9-4616aeead067@codeserver.dev.a7751f9e-1630-48b1-9de9-4616aeead067.drush.in:2222/~/repository.git ./
    rsync -rt --exclude=.git --delete $TRAVIS_BUILD_DIR/export/ $TRAVIS_BUILD_DIR/prod/
    git add --all
    git commit -m "KALABOT BUILDING COMMIT ${TRAVIS_COMMIT} FROM ${TRAVIS_REPO_SLUG}"
    git push origin master -f
  fi
}

# before-deploy
#
# Clean up after the tests.
#
before-deploy() {
  echo
}

# after-deploy
#
# Clean up after the tests.
#
after-deploy() {
  echo
}

##
# UTILITY FUNCTIONS:
##

# Sets the exit level to error.
set_error() {
  EXIT_VALUE=1
}

# Runs a command and sets an error if it fails.
run_command() {
  set -xv
  if ! $@; then
    set_error
  fi
  set +xv
}

##
# SCRIPT MAIN:
##

# Capture all errors and set our overall exit value.
trap 'set_error' ERR

# We want to always start from the same directory:
cd $TRAVIS_BUILD_DIR

case $COMMAND in
  before-install)
    run_command before-install
    ;;

  before-script)
    run_command before-script
    ;;

  script)
    run_command script
    ;;

  after-script)
    run_command after-script
    ;;

  after-success)
    run_command after-success
    ;;

  before-deploy)
    run_command before-deploy
    ;;

  after-deploy)
    run_command after-deploy
    ;;
esac

exit $EXIT_VALUE
