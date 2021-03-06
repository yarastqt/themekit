/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

if (typeof window === 'undefined') {
	require('json5/lib/register')
}


let glob = require('glob')
let deepExtend = require('./deepExtend')
let extend = require('lodash/extend')
let path = require('path')
let resolveCwd = require('resolve-cwd')

/**
 * Takes an array of json files and merges
 * them together. Optionally does a deep extend.
 * @private
 * @param {String[]} arr - Array of paths to json (or node modules that export objects) files
 * @param {Boolean} [deep=false] - If it should perform a deep merge
 * @param {Function} collision - A function to be called when a name collision happens that isn't a normal deep merge of objects
 * @returns {Object}
 */
function combineJSON(arr, deep, collision) {
  let i
  let files = []
  let to_ret = {}

  for (i = 0; i < arr.length; i++) {
    let new_files = glob.sync(arr[i], {})
    files = files.concat(new_files)
  }

  for (i = 0; i < files.length; i++) {
    let resolvedPath = resolveCwd(path.isAbsolute(files[i]) ? files[i] : './' + files[i])
    var file_content

    try {
      // This delete force require(resolvedPath) to take the latest version of the file. It's handfull when using the node package along chokidar.
      delete require.cache[resolvedPath]
      file_content = require(resolvedPath)
    } catch (e) {
      e.message = 'Failed to load or parse JSON or JS Object: ' + e.message
      throw e
    }

    if (deep) {
      deepExtend([to_ret, file_content], collision)
    } else {
      extend(to_ret, file_content)
    }
  }

  return to_ret
}

module.exports = combineJSON
