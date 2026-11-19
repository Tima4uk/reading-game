# Локальные аудиоклипы по буквам, звукам и диграфам (`assets/audio/`)

Этот каталог позволяет подключить собственные короткие аудиозаписи (например, нарезанные по буквам/фонемам) поверх встроенного синтезатора речи (TTS). Если файла для нужного звука нет в `manifest.json`, приложение автоматически и без ошибок 404 использует запасной синтезатор речи.

## Структура папок

```text
assets/audio/
  manifest.json
  ru/
    phonemes/{fileKey}.mp3   # чистые звуки-фонемы (например: a.mp3, b.mp3, zh.mp3, hard_sign.mp3)
    letters/{fileKey}.mp3    # названия букв алфавита
    digraphs/{fileKey}.mp3   # звуки сочетаний/диграфов (zhi.mp3, shi.mp3, cha.mp3, ...)
  pl/
    phonemes/{fileKey}.mp3   # a.mp3, a_ogonek.mp3, c_acute.mp3, l_stroke.mp3, ...
    letters/{fileKey}.mp3
    digraphs/{fileKey}.mp3   # sz.mp3, cz.mp3, rz.mp3, ...
  en/
    phonemes/{fileKey}.mp3   # a.mp3 .. z.mp3 (фониксы Science of Reading)
    letters/{fileKey}.mp3    # A..Z названия букв
    digraphs/{fileKey}.mp3   # ck.mp3, sh.mp3, ch.mp3, th.mp3, ng.mp3, wh.mp3, ph.mp3, qu.mp3
```

Поддерживаемые браузером форматы: `.mp3`, `.wav`, `.ogg`, `.m4a`.
Точные значения `fileKey` заданы в `src/phonics.js` (`PHONEME_DATA` и `PHONICS_DIGRAPHS`).

## Автогенерация `manifest.json` после добавления файлов (PowerShell)

Выполните из корня репозитория (Windows PowerShell):

```powershell
$m=[ordered]@{version=1;letters=@{ru=@{};pl=@{};en=@{}};phonemes=@{ru=@{};pl=@{};en=@{}};digraphs=@{ru=@{};pl=@{};en=@{}}}; Get-ChildItem 'assets\audio' -Recurse -File | Where-Object {$_.Extension -match '^\.(mp3|wav|ogg|m4a)$'} | ForEach-Object { $p=$_.FullName.Substring((Resolve-Path 'assets\audio').Path.Length+1).Replace('\','/') -split '/'; if($p.Length -eq 3 -and $m.Contains($p[1]) -and $m[$p[1]].ContainsKey($p[0])){ $m[$p[1]][$p[0]][$_.BaseName]="$($p[0])/$($p[1])/$($p[2])" } }; [System.IO.File]::WriteAllText('assets\audio\manifest.json',($m | ConvertTo-Json -Depth 4),[System.Text.UTF8Encoding]::new($false))
```
