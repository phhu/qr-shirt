set -o allexport; source .env; set +o allexport
qrcode $URL -t svg -o qr/qrcode.svg
