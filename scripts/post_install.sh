#!/bin/bash
if [ "$DEPLOYMENT_GROUP_NAME" == "staging" ]; then
sudo rsync -av /var/www/deploy/ /var/www/devhtml/
fi
# Copy source files to PRODUCTION environment
if [ "$DEPLOYMENT_GROUP_NAME" == "production" ]; then
sudo rsync -av /var/www/deploy/ /var/www/html/
fi
