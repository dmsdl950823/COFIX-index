'use client'
import { Button, Upload, message} from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import XLSX from "xlsx"
import Util from '@/components/Utils/'


const props = {
  name: 'file',
  action: undefined,

  /**
   * action 업로드 전처리 (자동 업로드 차단)
   * @param raw 
   * @returns Boolean
   */
  async beforeUpload (raw: File) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(raw)
    reader.onload = () => {
      const file = reader.result

      const workbook = XLSX.read(file)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]

      const data:string[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      // 데이터 가공 시작
      // console.log(data)
      Util.chartDataFormatting(data)
    }

    return false
  },
  onChange(info: any) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}

export default function UploadComponent () {
  return (
    <Upload {...props}>
      {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
      <Button>Click to Upload</Button>
    </Upload>
  )
}
