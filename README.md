# JSON-2-XLSX-2-JSON

## Installing

Tested with older `NodeJS 14.21.0 & NPM 6.14.17`, and newest `LTS NodeJS 22.14.0 & NPM 11.1.0`

```bash
npm install
```

## Usage:

### Converting .json to .xlsx:

```bash
npm run 2-xlsx C:/full/path/to/folder
```

#### notes:

Excepting that `C:/full/path/to/folder` contain `.json` files and folders in this exact hierarchy:

```
C:/full/path/to/folder:
 -ua
  -common.json
  -components.json
 -es
  -common.json
  -components.json
```

After running the script it will generate `.xlsx` files in the same directory as was given, with exact names as shown below:

```
C:/full/path/to/folder:
 -locales_ua.xlsx
 -locales_es.xlsx
```

<br />

### Converting .xlsx to .json:

```bash
npm run 2-json C:/full/path/to/folder
```

#### notes:

Excepting that `C:/full/path/to/folder` folder contains `.xlsx` files right in under the given directory:

> FILE NAMES SHOULD NOT BE CHANGED FROM WHAT `2-xlsx` RESULTED WITH

```
C:/full/path/to/folder:
 -locales_ua.xlsx
 -locales_es.xlsx
```

After running the script it will generate `.json` files and create per-locale sub-directories based on `.xlsx` filename in the same directory as was given:

```
C:/full/path/to/folder:
 -ua
  -common.json
  -components.json
 -es
  -common.json
  -components.json
```
