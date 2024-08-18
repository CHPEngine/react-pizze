import style from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <h1>
        <p>😕</p>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению, данной страницы не существует в нашем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
