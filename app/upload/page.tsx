'use client'
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState<string | undefined>(undefined);

  return (
    <div>
      {publicId && <CldImage src={publicId} width={270} height={180} alt='image' />}

      <CldUploadWidget
        uploadPreset='zrselo2l'
        options={{
            sources: [
                "local"
            ]
        }}
        onSuccess={(result) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
          console.log(result);
        }}
      >
        {({ open }) => <button className='btn btn-primary' onClick={() => open()}>Upload</button>}
      </CldUploadWidget>
    </div>
  );
}

export default UploadPage;
