import CommonLayout from '../CommonLayout.jsx';
import Header from './Header.jsx';

export default function Layout(children) {
  return (
    <CommonLayout {...children.props} >
      <Header>
        {children}
      </Header>
    </CommonLayout>
  );

}
