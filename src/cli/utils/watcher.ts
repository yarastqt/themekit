import { watch as w } from 'chokidar'

type Paths = string | ReadonlyArray<string>
type OnChange = () => void

export function watch(paths: Paths, onChange: OnChange): void {
  console.log('\nWatching for changes...')

  let isShutdown = false
  const watcher = w(paths, { ignoreInitial: true, atomic: 500 })

  const onChangeWrapper = () => {
    if (!isShutdown) {
      onChange()
    }
  }

  const onProcessStop = () => {
    isShutdown = true
    console.log('\nShutting down watch')
    watcher.close()
  }

  watcher.on('unlink', onChangeWrapper)
  watcher.on('add', onChangeWrapper)
  watcher.on('change', onChangeWrapper)

  process.once('SIGINT', onProcessStop)
  process.once('SIGTERM', onProcessStop)
}
