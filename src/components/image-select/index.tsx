import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ImageSelectProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

import { useState } from 'react';
import { useMount } from 'ahooks';
import { ApiRandomImageResponse } from '@/components/image-select/type';
import { pexelsClient } from '@/utils/api-client';

export function ImageSelect(props: ImageSelectProps = { name: 'product' }) {
  const [images, setImages] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState<string | undefined>('');
  useMount(() => {
    pexelsClient.photos.curated({ per_page: 3 }).then((photos) => {
      const res = photos as unknown as ApiRandomImageResponse;
      setImages(res.photos.map((p) => p.src.original));
      setCurrentImage(res.photos[0].src.original);
      if (!props.value) {
        if (props.onChange) {
          props.onChange(res.photos[0].src.original);
        }
      }
    });
  });
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>{props.name} Cover</CardTitle>
        <CardDescription>Choose a cover image for your {props.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <img
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="400"
            src={currentImage || '/placeholder.svg'}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(image);
                  if (props.onChange) {
                    props.onChange(image);
                  }
                }}
              >
                <img
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  src={image || '/placeholder.svg'}
                  width={100}
                  height={130}
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ImageSelect;
