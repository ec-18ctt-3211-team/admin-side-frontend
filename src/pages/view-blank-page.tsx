import Searchbar from 'components/common/searchbar';
import { Layout } from 'components/common';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function ViewBlankPage(props: Props): JSX.Element{
  return(      
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}>
      <div className =' bg-white rounded-lg border-b p-2'>
        <Searchbar></Searchbar>
      </div>
    </Layout>
  );
}