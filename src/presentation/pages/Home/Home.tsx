import { useEffect } from 'react';

import { FetchTodo } from '../../../domain/use-cases/FetchTodo';

import styles from './styles.module.css'

interface IHomeProps {
  fetchTodo: FetchTodo;
}

export function Home({ fetchTodo }: IHomeProps) {
  useEffect(() => {
    const get = async () => {
      try {
        const data = await fetchTodo.fetch();
        console.log('data', data)
      } catch (error) {
        const parsedError = error as Error;
        console.error(parsedError.message);
      }
    }

    get();
  }, [fetchTodo]);

  return (
    <div className={styles.container}>
      <h1>Página Home</h1>
    </div>
  )
}