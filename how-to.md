# Publication
keytool -genkey -v -keystore c2s-101.keystore -alias c2sconciergerie -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore c2s-conciergerie.keystore E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release/app-release-unsigned.apk cs2-conciergerie
-- mdp conciergerie
cd E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release
zipalign -v 4 E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\c2s-conciergerie.apk

zipalign -v 4 E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\c2s-conciergerie.apk

apksigner sign --ks c2s-101.keystore --ks-key-alias c2sconciergerie c2s-conciergerie.apk