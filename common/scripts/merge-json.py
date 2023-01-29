import json

files=["bioteknik", "bme", "data", "elektro", "fysik", "indek", "infocom", "kemi", "lantis", "maskin", "nano", "pi", "tekniskdesign", "vatten", "weko"]

def merge_JsonFiles(filename):
    result = list()
    for f1 in filename:
        with open(f1 + '.json', 'r', encoding='utf-8') as infile:
            result.extend(json.load(infile))

    with open('courses_all.json', 'w', encoding='utf-8') as output_file:
        json.dump(result, output_file, ensure_ascii=False)

merge_JsonFiles(files)