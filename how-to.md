# Publication
-- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore c2s-conciergerie.keystore E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release/app-release-unsigned.apk cs2-conciergerie
-- mdp conciergerie
cd E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release
zipalign -v 4 E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk E:\app_pdt\conciergerie2s\FrontEnd\Conciergerie2s\c2s-conciergerie.apk