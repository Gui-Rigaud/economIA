import styles from './upload.module.scss'
import UploadButton from "@/components/UploadButton";
import logoImg from '/public/logo.svg'
import Image from 'next/image';

// A logo ta bugada mas deixei ai pra ter uma ideia ja 

export default function Upload() {
  return (
    <div className={styles.Container}>
      <Image src={logoImg} alt="Logo" width={150} height={150} /> 
      <h1 className={styles.HighlightText}>Falta pouco!</h1>
      <p>Precisamos de um documento com seus gastos para a análise da IA</p>
      <UploadButton />
    </div>
  )
}
