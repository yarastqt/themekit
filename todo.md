- [ ] Валидация наличия transform для name
- [ ] Получение информации об неразрезолвленных токенах
- [ ] Добавить verbose/debug мод для отладки
- [ ] Реализовать devtools для отладки в браузере
- [ ] Реализовать хуки на before/after как в graphql
- [ ] Подумать про то, как удалить бэм-платформы и заменить на что-то более адекватное
- [ ] Подумать как сделать форматирование (возможно это должно быть в хуках)
- [ ] Хуки также позволят создать builtin хук, который будет записывать хэш в хэд файлов для инвалидации
- [ ] Подумать про то, чтобы output был массивом, т.к. есть ощущение, чт олюди п утаются зачем там объект нужен типо oputput::css
- [ ] Разобраться с типами для Map, почему-то get возвращает без undefined (возможно из-за strict )
- [ ] Подумать про надобность типов в трансформерах
- [ ] Использовать классы для токенов + сериализация (можно будет заменить cache в резолвине вместо массива использовать ссылку на ноду)
- [ ] Добавить silence мод для cli
- [ ] Добавить время выполнения




## Компилятор переменных

- [ ] Записать в ref несколько значений
- [ ] Написать тест
- [ ] Подумать про sources-map для ошибок



## Миграция

1. value/color-function — actions
1. useComments — обсудить
1. name/cti/kebab
1. API params


```ts
class TokenNode implements Token {
  static create(shape: Token) {
    return new TokenNode(shape)
  }

  name: string
  value: TokenValue
  path: string[]
  attributes: Record<string, any>
  refs: Pick<TokenBase, 'value' | 'name'>[]
  original: Pick<TokenBase, 'value'>

  constructor(shape: Token) {
    Object.assign(this, shape)
  }
}
```
