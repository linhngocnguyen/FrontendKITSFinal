import { Space, Image, Button } from 'antd'
import { Link } from 'react-router-dom';
const NotFound = () => (
  <Space direction='vertical'>
    <Image
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
      preview={false}
    />
    <Link to="/">
        <Button type='primary'>Back to Home</Button>
    </Link>
  </Space>
);

export default NotFound;