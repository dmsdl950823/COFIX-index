
const chartDataFormatting = (data: string[]) => {
  const [title, header, ...items] = data
  const cols = header.length // 컬럼 데이터 개수
  
  const keys = {
    '단기 COFIX 통계 (단위 : %)': {
      code: 'short_cofix',
      columns: ['announced', 'period', 'value']
    },
    'COFIX 통계 (단위 : %)': {
      code: 'cofix',
      columns: ['announced', 'newStd', 'restStd', 'value']
    }
  }[title[0]]

  console.log(title, header, items, keys)
}

export default {
  chartDataFormatting
}