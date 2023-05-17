# it just counter

## What?

- Counts the number of visitors

## How?

- https://counter.itjustbong.workers.dev/visit?url=${URL}
- ${URL} is the url you want to count visitors

## Example

### with JSON

https://counter.itjustbong.workers.dev/visit?url=itjustbong.me

```json
{ "today": 10, "total": 10, "updatedAt": "2023-05-12T00:47:42.641Z" }
```

### with SVG

- text: SVG Text element
- bgColor: SVG Background Color
  counter.itjustbong.workers.dev/visit?url=itjustbong.me&type=svg&text=itjustbong-counter&bgcolor=rgb(10,100,10)

![svg visitor](<https://counter.itjustbong.workers.dev/visit?url=itjustbong.me&type=svg&text=itjustbong-counter&bgcolor=rgb(10,100,10)>)
