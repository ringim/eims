echo "Switching to branch master"
git checkout master

echo "Building app.."
npm run build

echo "Deploying files to server..."
scp -r build/* hoopoems@45.79.123.220:/var/www/45.79.123.220/

echo "Done"
