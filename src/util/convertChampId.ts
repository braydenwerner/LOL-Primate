let version: string
export const getNewestVersion = async () => {
  const res = await fetch(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  )
  version = (await res.json())[0]
}

export const convertChampId = async (champId: string) => {
  if (!version) await getNewestVersion()

  const res = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/' +
      version +
      '/data/de_DE/champion.json'
  )
  let list = await res.json()
  let championList = list.data

  for (const i in championList) {
    if (championList[i].key == champId) {
      return championList[i].id
    }
  }
}

export const getAPIVersion = () => {
  if (!version) getNewestVersion()

  return version
}
