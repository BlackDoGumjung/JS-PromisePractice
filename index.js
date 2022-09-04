// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

console.log(1);
console.log(() => {
  console.log(2);
}, 100);
console.log(3);
//차례 1 -> 3 -> 2

//동작원리
//웹 브라우저 동작 원리
// 자바스크립트는 처리가 빨리 되는 것부터 처리해줌... : 병렬처리되는 언어라고 하는데 이건 중요하지 x
// 자바스크립트쨩은 stack이라는 공간 안에서 코드를 한줄씩 실행해줌 -> 싱글 스레디드 랭귀지 = 동기적 처리
// setTimeout, ajax, 이벤트리스너(->얘네가 비동기적 처리) 같은 건 일단 대기실인 queue(web API, 실행 대기실) 로 넣어두고 나머지 실행되면 하나씩 올려보내줌 => 오래 걸리는 작업 있으면 제껴두고 다른 거부터 처리!
// 근데 올려보낼 때도 stack이 비어야만 올려보냄............

//자바스크립트로는 어려운 연산 시키면 안됨....(연산하느라 멈춰버리면 클릭하는 애들이나 통신 요청은 대기실을 반드시 거쳐와서 멈춰버리고 응답없는 페이지 그런 게 떠버린다......)

//결론*
//stack을 바쁘지 말ja
//queque도 바쁘게 하면 x

console.log(1);
setTimeout(function () {
  console.log(2);
}, 1000);
addEventListener('click', 함수); //함수를 만들어 쓸 때는 함수()로 써선 안됨. click을 하기 전에 함수부터 처리해버리기 때문에...
//콜백 함수를 사용하면 순차 처리가 되긴 함...

function 첫째함수(둘째함수) {
  // 파라미터로 이렇게 째주는 느낌적 느낌!
  console.log(1);
  둘째함수();
}

function 둘째함수() {
  console.log(2);
}

//첫째함수() 뒤에 둘째함수()를 실행하고 싶다면?
첫쨰함수(둘째함수); // 콜백함수는 함수 디자인 패턴일 뿐!

//콜백함수의 문제점? 이렇게 생겨벌임...
첫째함수(function () {
  둘째함수(function () {
    셋째함수(function () {});
  });
});

//프로미스를 첫째 함수로 디자인해놔야한다! (then을 쓰면 가로로 길어짐)

첫째함수()
  .then(function () {})
  .then(function () {});

var promise = new Promise(function (성공, 실패) {
  성공(); // 성공 판정 내리는 방법
  실패(); // 실패 판정 내리는 방법
}); // 1. 프로미스라는 변수 형성! (프로미스는 성공/실패 판정 기계임)
promise
  .then(function () {
    // .then 으로 뭐 실행 후 이거 실행을 이어준다!
    //프로미스가 성공할 경우 실행할 코드 -> 콜백함수 만드는 것과 비슷
  })
  .then(function () {
    //첫번째 거 실행한 후 실행해줄 코오드
  })
  .catch(function () {
    //실행 실패하면 코드 실행
  })
  .finally(function () {
    // 뭐가 됐든 실행
  });

var promise = new Promise(function (성공, 실패) {
  var 어려운연산 = 1 + 1; // 어려운 연산
  성공(어려운연산); // 여기를 실패로 바꿔주면 then 뒤의 코드 대신 .catch 뒤 코드 나오게 됨
}); // 파라미터를 넣으면 then 함수까지 전해짐!

promise
  .then(function (어려운연산) {
    // .then 으로 뭐 실행 후 이거 실행을 이어준다!
    console.log('성공');
  })
  .catch(function () {
    console.log('실패');
  })
  .finally(function () {
    // 뭐가 됐든 실행
  });

var promise = new Promise(function (성공, 실패) {
  setTimeout(function () {
    성공();
  }, 1000); // 1초 후 성공 판정해주는 프로미스 생성한 셈
});

promise
  .then(function (어려운연산) {
    console.log('1초 후 성공했어용'); // 1초 후 무조건 이걸 실행!
  })
  .catch(function () {
    console.log('실패');
  });

// 1. 성공은 resolved
// 2. 판정대기 중 pending
// 3. 실패는 rejected

//프로미스는 다이나믹하게 변하는 애임!
//비동기적 처리가 가능하게 바꿔주는 문법이 아니다............  그냥 콜백 디자인의 대체품임

// ajax 통신하는 fetch().then .catch 는 promise가 리턴!!!!
// fetch()는 쌩자바스크립트 문법임... promise가 리턴돼서 .then, .catch 사용할 수 있는 거임...

// 그러니까... promise 자체를 만들면 promise 가 성공인지 실패인지 가늠해주게 하는 기계를 만드는 것일 뿐
// 비동기적 처리를 동기적으로 막무가내로 만들어주는 게 아냐...
// 예를 들어서 promise 안에 연산이 길면 그 뒤에 처리해야하는 게 100퍼 멈추니까...

// 그럼 내가 만들 때는..?

// 루나샌드 통신을 하고 reducer에 저장된 형태를 성공으로 띄우면
// 그 뒤에 나오는 걸 then으로 만들어서 처리될 수 있게 만들 순 있음.

const gattConnectPromise = new Promise((resolve, reject) => {
  dispatch(
    bleAction.gattConnect(address, function () {
      if (gattClientId !== '') {
        resolve();
      } else {
        reject();
      }
    })
  );
});

//해당 어드레스를 클릭하면?
const clickConnect = () => {
  // 어떤 연산인데... 여기에서 해야할일은...
  // 일단 name 리듀서에 저장해주고, status 상태 connecting이면 연결 중이랑 애니메이션 나오게 하기?
  // 근데 문제가... connecting이 연결 전에 바로 나와야 하니까 블레 액션이 시작한 후에야 나올 거야 아마...?
  gattConnectPromise.then(() => {
    // 그럼 통신이 시작되고 나서 중간에 이게 시작되면 나오게 만들기...
    //(아니면 클릭한 다음 디스패치를 connecting으로 여기에서 만들어주기??)
    if (connectStatus.status === 'connecting') {
      //연결 중 문구랑 애니메이션 나오게 만들고??
    }
    setTimeout(() => {
      //그 담에 이거 열건지 저거 열건지...
      if (gattClientId !== '' && connectStatus.status === 'connected') {
        setConnect(true);
      } else if (connectStatus.status === 'connecting') {
        setAlreadyConnect(true);
      }
    }, 500);
  });
};
//위의 경우라면 FAIL했을 때 리듀서에 CLIENTID를 완벽하게 지워줘야함!

var imgLoading = new Promise(function (성공, 실패) {
  const img = document.querySelector('#test'); // 셀렉터로 이미지 만들기
  img.addEventListener('load', function () {
    // 어떤 이벤트 리스너 로딩이 성공하면 성공 판정
    //로딩 성공하면?
    성공();
  });
  img.addEventListener('error', function () {
    //로딩 안 되면 에러, 어떤 이벤트 리스너 로딩이 실패하면 실패 판정...
    실패();
  });
});

imgLoading
  .then(function () {
    // .then 함수  => 성공시  코드
    console.log('로딩 성공');
  })
  .catch(function () {
    // .catch함수 => 실패시 코드
    console.log('에러');
  });

//ajax 요청 성공시 또 다른 곳으로 ajax요청
const promise = new Promise((성공, 실패) => {
  $.get('http://codingapple.github.io/hello.txt').done(function (결과) {
    // 요청한 인사말을 결과로 넣는 셈!
    성공(결과);
  });
});

promise
  .then(function (결과) {
    console.log(결과); // 그래서 결과가 나오는 거임
    //그 담에~ 또 다른 통신을 가져오는 방법은!?
    return new Promise((성공, 실패) => {
      $.get('http://codingapple.github.io/hello2.txt').done(function (결과) {
        // 요청한 인사말을 결과로 넣는 셈!
        성공(결과);
      });
    }); // hello2.txt를 요청하는 promise -> promise 오브젝트를 또 만들어주는 셈 -> promise를 순차적으로 만들어주는 어쩌구!
  })
  .then(function (결과) {
    console.log(결과);
  });

//.then()에서 new Promise를 퉤(=리턴)하면 뒤에 then을 또 쓸 수 있구나?!...라고 생각하면 됨.

// 그러나 위는 중복이 많기 때문에 함수로 묶어서 처리해줄 수 있음!

function ajax해주는함수(url) {
  return new Promise((성공, 실패) => {
    $.get(url).done(function (결과) {
      // 요청한 인사말을 결과로 넣는 셈!
      성공(결과);
    });
  });
}

// 함수로 만들고 그걸 활용하는 게 좋음 (파라미터 활용)
var promise = ajax해주는함수('http://codingapple.github.io/hello.txt');
promise
  .then(function (결과) {
    console.log(결과);
    return ajax해주는함수('http://codingapple.github.io/hello.txt');
  })
  .then(function (결과) {
    console.log(결과);
  });
//아주 간단하게 맹글 수 있음!

//promise가 어색하면 async / await을 이용하쇼!

async function 더하기() {
  // 함수 앞에다만 붙일 수 있음!
  1 + 1; // 연산 끝난 후 특정 코드를 실행하고 싶을 때!
} // promise 객체가 남음! async 만 붙이면!

더하기().then(function () {
  console.log('성공시대');
});

async function 더하기() {
  // 함수 앞에다만 붙일 수 있음!
  return 1 + 1; // 리턴 연산 결과를 출력해주고 싶다...!
} // promise 객체가 남음! async 만 붙이면!
더하기().then(function () {
  console.log('결과');
});
//그런데...! 이건 성공만 가능합니다요....

//async 안에서 쓰는 await!
const 더하기 = async () => {
  const 프로미스 = new Promise((resolve, reject) => {
    const 힘든연산 = 1 + 1;
    resolve;
  });
  var result = await 프로미스;
  console.log(result);
};

async function 더하기() {
  var promise = new Promise(function (resolve, reject) {
    var 힘든연산 = 1 + 1;
    resolve();
  });

  // promise.then(function(){
  //   console.log('성공했다구요!')
  // });
  // try{이거 해보고 에러나면} catch{이걸 실행해보시죠} await은 실패가 없으니까... 방지하려면 try{} catch{} 쓰시오!
  try {
    var result = await promise; // 위랑 밑은... 똑같은 코드임... then 대신 사용 가능! promise 해결까지 기다려주셈.
    console.log(result);
  } catch {
    console.log('연산 망했어용');
  }
}
더하기();

//await은 실패 시 에러나고 멈춰버림...

//버튼 누르면 성공 판정 나게 만들기
async function 더하기() {
  var promise = new Promise(function (성공, 실패) {
    document.getElementById('button').addEventListener('click', function () {
      성공('성공했다');
    });
  });
  var promise = await promise;
  console.log(결과);
}

const gattConnectPromise = new Promise((resolve, reject) => {
  dispatch(
    bleAction.gattConnect(address, () => {
      if (gattClientId !== '') {
        resolve();
      } else {
        reject();
      }
    })
  );
});

//해당 어드레스를 클릭하면?
const clickConnect = () => {
  // 어떤 연산인데... 여기에서 해야할일은...
  // 일단 name 리듀서에 저장해주고, status 상태 connecting이면 연결 중이랑 애니메이션 나오게 하기?
  // 근데 문제가... connecting이 연결 전에 바로 나와야 하니까 블레 액션이 시작한 후에야 나올 거야 아마...?
  gattConnectPromise.then(() => {
    // 그럼 통신이 시작되고 나서 중간에 이게 시작되면 나오게 만들기...
    //(아니면 클릭한 다음 디스패치를 connecting으로 여기에서 만들어주기??)
    if (connectStatus.status === 'connecting') {
      //연결 중 문구랑 애니메이션 나오게 만들고??
    }
    setTimeout(() => {
      //그 담에 이거 열건지 저거 열건지...
      if (gattClientId !== '' && connectStatus.status === 'connected') {
        setConnect(true);
      } else if (connectStatus.status === 'connecting') {
        setAlreadyConnect(true);
      }
    }, 500);
  });
};
