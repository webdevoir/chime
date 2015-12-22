require 'aws-sdk'
require 'singleton'

class S3Presigner
  include Singleton

  def presign(prefix, filename, limit: limit)
    extname = File.extname(filename)
    filename = "#{SecureRandom.uuid}#{extname}"
    upload_key = Pathname.new(prefix).join(filename).to_s

    creds = Aws::Credentials.new(
      ENV['AWS_ACCESS_KEY_ID'],
      ENV['AWS_SECRET_ACCESS_KEY']
    )

    s3 = Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
    object = s3.bucket("chime-audio-assets-dev").object(upload_key)

    params = { acl: 'public-read' }
    params[:content_length] = limit if limit

    {
      presigned_url: object.presigned_url(:put, params),
      public_url: object.public_url
    }
  end
end
