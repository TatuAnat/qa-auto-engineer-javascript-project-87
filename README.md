### Hexlet tests and linter status:
[![Actions Status](https://github.com/TatuAnat/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/TatuAnat/qa-auto-engineer-javascript-project-87/actions)


[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=TatuAnat_qa-auto-engineer-javascript-project-87&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=TatuAnat_qa-auto-engineer-javascript-project-87)

# gendiff

Простой инструмент для сравнения двух плоских JSON-файлов.

## Установка

Убедитесь, что зависимости установлены:

```powershell
npm install
```

## Использование (CLI)

```powershell
node ./bin/gendiff.js ./file1.json ./file2.json
```

Пример вывода для предоставленных файлов:

```
{
	- follow: false
		host: hexlet.io
	- proxy: 123.234.53.22
	- timeout: 50
	+ timeout: 20
	+ verbose: true
}
```

## Использование как библиотеки

```js
import genDiff from './src/index.js'

const result = genDiff('./file1.json', './file2.json')
console.log(result)
```

## Примечания
- Поддерживается только плоский JSON (ключ-значение) — формат определяется по расширению файла.
- Для сортировки ключей используется `lodash`.
- Для работы с файлами используются синхронные функции `fs`.


## Demo: Gendiff

[![asciicast](https://asciinema.org/a/764880.svg)](https://asciinema.org/a/764880)