- **generator function:**

```javascript
function* funcName() {}
```

- **blocking:** nhận một action $\Rightarrow$ dừng lại cho đến khi thực thi xong.
- **non-blocking:** sẽ chạy ngay lập tức
- **worker:** saga thực thi action bên trong nó mỗi khi nhận được một action từ watcher.
- **watcher:** saga theo dõi tất cả action gửi đến middleware và thông báo cho các worker thực thi action tương ứng.
- **takeEvery(action_type, worker):** chạy saga với mỗi lần action được dispatch, dùng để GET / Fetching data từ API.
- **takeLatest(action_type, worker):** chạy saga với mỗi lần action được dispatch, nếu có nhiều action được dispatch cùng lúc thì chỉ chạy action mới nhất được dispatch, dùng để CREATE / UPDATE.
- **take(action_type):** chờ một action cụ thể và trả về payload, dùng để DELETE.
- **put(action_creator):** dispatch action bên trong redux saga.
- **call(function, parameters):** gọi function trong redux saga, xử lý bất đồng bộ và chờ response rồi tiếp tục thực thi saga, dùng với take và blocking saga.

```javascript
function* deleteUser({ userId }) {
  try {
    const result = yield call(api.deleteUser, userId);
  } catch (e) {}
}

function* watchDeleteUserRequest() {
  while (true) {
    const { userId } = yield take(action.Types.DELETE_USER_REQUEST);
    yield call(deleteUser, { userId });
  }
}
```

- **fork(watcher):** gọi một function nhưng chạy độc lập, không bị blocking.
- **throttle(time, action_type, worker):** nếu một action được dispatch liên tục thì watcher sẽ thực hiên worker sau một khoảng thời gian
- **debounce(time, action_type, worker):** nếu một action được dispatch liên tục thì bắt đầu từ lúc action ngưng dispatch sau một khoảng thời gian watcher sẽ gọi thực hiện worker
- **all:** giống Promise.all, thực thi đồng thời các worker
