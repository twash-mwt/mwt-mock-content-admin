import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DynamicPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [slugValue, setSlugValue] = useState<any>();

  useEffect(() => {
    // Fetch data or perform actions based on the dynamic slug array
    setSlugValue(slug);
  }, [slug]);

  return (
    <div>
      <h1>Dynamic Page</h1>
      {slugValue}
      {/* Render content based on the dynamic slug */}
    </div>
  );
};

export default DynamicPage;
