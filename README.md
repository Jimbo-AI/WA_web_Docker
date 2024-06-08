
## API Reference

#### Get status service

```http
  GET /status
```

#### Create session QR

```http
  POST /session
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clientId`      | `string` | **Required**. Client phone number |
| `customerID`      | `string` | **Required**. ID Customer for session client |

#### Show QR for scan

```http
  GET /qr
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clientId`      | `string` | **Required**. Client phone number |

#### Send message for client
```http
  POST /envio
```
Request
```json 
{
    "numero":"5215511223344",
    "mensaje":"mensaje de prueba\n linea nueva",
    "type":"text"
}
```
