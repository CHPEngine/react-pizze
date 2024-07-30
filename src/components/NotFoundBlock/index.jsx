import style from './NotFoundBlock.module.scss';
export default function NotFoundBlock() {
  return (
    <div className={style.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>К сожалению, данной страницы не существует в нашем интернет-магазине</p>
    </div>
  );
}
