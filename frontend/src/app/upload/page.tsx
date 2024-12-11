'use client'

import React from "react"
import Papa from 'papaparse';
import styles from './upload.module.css'

const accetableCSVFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv';

export default function Upload(){
  
  function onFileChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
    if (event.target.files && event.target.files[0]){
      const csvFile = event.target.files[0]
      Papa.parse(csvFile, {
        skipEmptyLines: true,
        complete: function(results) {
          console.log("Finished:", results.data);
        }
      });}else{
        console.log('Nenhum arquivo encontrado')
      }
    
}

  return(
    <header className={styles.Header}>
      <label htmlFor="csvFileSelector" className={styles.InputLabel}>
        Selecione o arquivo (*csv, xls, etc.)
      </label>
      <input type="file" id="csvFileSelector" accept={accetableCSVFileTypes} onChange={onFileChangeHandler} className={styles.Input}/>
    </header>
  )
}