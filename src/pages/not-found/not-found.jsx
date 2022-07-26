import styles from './not-found.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.container}>
      <p className='text_type_main-large'>404</p>
      <p className='text_type_main-medium'>Страница не найдена.</p>
    </div>
  );
}
