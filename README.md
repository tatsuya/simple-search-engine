## Installation

Install dependencies:

    $ cd simplesearchengine
    $ npm install

Start the server:

    $ node index.js

### Add a document

    curl -X POST http://localhost:3000/index/1 -d 'フグ田サザエ 本作の主人公。福岡県生まれの磯野家の長女。特徴的な髪型は当時の流行にあわせている。単行本1巻で東京に引っ越し、単行本2巻でフグ田マスオと結婚しタラオをもうける。性格は快活でそそっかしく、よくカツオと取っ組み合いの喧嘩をしている。'
    curl -X POST http://localhost:3000/index/2 -d '磯野カツオ 磯野家の長男で小学生。アニメ版では一貫してかもめ第三小学校5年3組となっている（ワカメも同様）。髪型は基本的に丸刈り。連載開始当初は、ワカメの面倒をよく見ているちょっと抜けているお兄さん、といった雰囲気を持っていた。連載後半になるにつれ、現在のアニメ版のようなズル賢く機転の利く腕白坊主となり、口も達者となり登場回数も格段に多くなる。漫画界における「世渡り上手」の代表的キャラクター。原作においては、学校での生活や友達関係が描かれることはほとんどない。'
    curl -X POST http://localhost:3000/index/3 -d '磯野ワカメ 磯野家の次女。原作漫画では最終的に小学1年生で7歳の設定だが、アニメでは小学3年生。原作とアニメ版において最も性格が異なる。性格は天真爛漫で、非常に活溌である。アニメ版では「優等生」になっており存在感も薄いが、原作では立場が逆であった。連載中盤まででは、サザエに次いで登場回数の最も多いキャラクターであり、話の「オチ」を担うこともかなり多い。'

### Show all documents

    curl -X GET http://localhost:3000

### Search documents by keyword

    curl -X POST http://localhost:3000/search -d 'サザエ'
    curl -X POST http://localhost:3000/search -d 'ワカメ'
    curl -X POST http://localhost:3000/search -d 'タマ'

### Delete a document

    curl -X DELETE http://localhost:3000/1
    curl -X DELETE http://localhost:3000/2
    curl -X DELETE http://localhost:3000/3

## Running test

To run the test suite first invoke the following command within the repo, installing the development dependencies:

    $ npm install

then run the tests:

    $ make test