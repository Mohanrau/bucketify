// AWS SDK
import {
  ListObjectsV2Request,
  ListObjectsV2Output,
  GetObjectRequest,
  // GetObjectOutput,
  // GetObjectOutput
} from 'aws-sdk/clients/s3'

// Message
import {
  msgInValidAccessKey,
  msgSignatureDoesNotMatch,
  msgNetworkingError,
  msgAccessDenied,
  // msgFileNotFound
} from '../message'

// Typing
import { TAlert } from '../../03_organisms/alert'

// Utilify
import { getMetadataBySignedUrl, TAudioMetaData } from '../audioMetaDataParser'
import { isAllowedAudioFormat } from '../utility'

/**
 * Call list object s3 api, and filter result to remain audio files.
 *
 * @param {AWS.S3} s3
 * @param {string} bucketName
 * @param {(alert: TAlert) => void} handleAlerts
 * @return Promise()
 */
export const listObjectKeys = async (
  s3: AWS.S3,
  bucketName: string,
  handleAlerts: (alert: TAlert) => void
) => {
  console.group('CALL_LIST_OBJECTS_API')

  // List objects
  console.info('Start list objects oparation.')
  let keyList: string[] = []
  try {
    console.group('CALL_API_TRY_STATEMENT')
    for (let continuationToken = null ;;) {
      console.info('ContinuationToken -> ' + continuationToken)

      const params: ListObjectsV2Request = {
        Bucket: bucketName,
      }
      if (continuationToken) {
        params.ContinuationToken = continuationToken
      }

      // Call S3 API
      let objects: ListObjectsV2Output = {}
      console.info('Call api start')
      objects = await s3
        .listObjectsV2(params)
        .promise()
        .then((data) => {
          return data
        })
        .catch((err) => {
          console.error('An error occured when call list objects v2 API.')
          throw err
        })
      console.info('Call api end')

      // Filter objects to remain only audio metadata
      if (objects.Contents === undefined) {
        break
      }
      objects.Contents.map((v) => v.Key).forEach((key) => {
        if (key === undefined) {
          return
        }

        if (isAllowedAudioFormat(key)) {
          keyList.push(key)
        }
      })

      // If the object counts over 1000, isTruncated will be true.
      if (!objects.IsTruncated) {
        console.info('All objects were listed, so the list buckets operation will be finished.')
        break
      }

      // Save the next read position.
      continuationToken = objects.NextContinuationToken
    }
    console.table(keyList)
    console.groupEnd()
  } catch (err) {
    console.group('CALL_API_CATCH_STATEMENT')
    let alert: TAlert = { severity: 'error', title: '', description: '' }
    if (err.code === 'InvalidAccessKeyId') {
      alert.title = 'Error - InvalidAccessKeyId'
      alert.description = msgInValidAccessKey()
    } else if (err.code === 'SignatureDoesNotMatch') {
      alert.title = 'Error - SignatureDoesNotMatch'
      alert.description = msgSignatureDoesNotMatch()
    } else if (err.code === 'NetworkingError') {
      alert.title = 'Error - NetworkingError'
      alert.description = msgNetworkingError()
    } else if (err.code === 'AccessDenied') {
      alert.title = 'Error - AccessDenied'
      alert.description = msgAccessDenied()
    } else {
      // An unexpected error
      alert.title = 'Error - ' + err.code
      alert.description = err.message
    }

    handleAlerts(alert)
    console.error(err.code)
    console.error(err.message)
    console.error(err)
    console.groupEnd()

    throw err
  }

  console.groupEnd()
  return keyList
}

/**
 * GetItem from dynamodb and expand metadata
 *
 * @param {AWS.S3} s3
 * @param {string} bucketName
 * @param {string} key
 * @return Promise()
 */
export const getObjectMetadata = async (
  s3: AWS.S3,
  bucketName: string,
  key: string,
  handleAlerts: (alert: TAlert) => void
) => {
  console.group('CALL_GET_OBJECT_API')
  let audioMetaData: TAudioMetaData | null = null
  try {
    const params: GetObjectRequest = {
      Bucket: bucketName,
      Key: key,
    }
    console.info('Call api start')

    const s3SignedUrl = await s3.getSignedUrl('getObject', params)
    console.info(s3SignedUrl)
    audioMetaData = await getMetadataBySignedUrl(s3SignedUrl, key)

    console.info('Call api end')

  } catch (err) {
    console.group('CALL_API_CATCH_STATEMENT')
    let alert: TAlert = { severity: 'error', title: '', description: '' }
    alert.title = 'Error - ' + err.code
    alert.description = err.message

    handleAlerts(alert)
    console.error(err.code)
    console.error(err.message)
    console.error(err)
    console.groupEnd()

    throw err
  }

  console.groupEnd()
  return audioMetaData
}