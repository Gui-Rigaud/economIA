const { Storage: GoogleCloudStorage } = require('@google-cloud/storage');
/**
 * The 'path' module provides utilities for working with file and directory paths.
 * It can be used to handle and transform file paths in a way that is consistent across different operating systems.
 * 
 * @module path
 */
const path = require('path');

async function copyFile(src, dst) {
    const storage = new GoogleCloudStorage();

    try {
        // Extrai o nome do bucket e o caminho do arquivo de destino
        const dstBucketName = dst.split('gs://')[1].split('/')[0];
        const dstFilePath = dst.split('gs://')[1].split('/').slice(1).join('/');

        // Obtém o bucket de destino
        const bucket = storage.bucket(dstBucketName);

        // Obtém o nome do arquivo de origem
        const srcFileName = path.basename(src);

        // Caminho completo do arquivo no bucket de destino
        const destination = bucket.file(dstFilePath);

        // Faz o upload do arquivo local para o bucket de destino
        await bucket.upload(src, {
            destination: dstFilePath,

        });

        console.log(`Arquivo ${src} copiado para ${dst}`);
    } catch (err) {
        console.error(`Erro ao copiar arquivo: ${err}`);
    }
}

export class FileCopier {
    private src: string;

    constructor(src: string) {
        this.src = src;
    }

    async execute() {
        const srcPath = path.resolve(this.src);
        const dstPath = 'gs://fatura_cartao_1/json/fatura_cartao.txt';
        copyFile(srcPath, dstPath);
    }
}