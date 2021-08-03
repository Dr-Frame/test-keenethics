import './CloseBtn.scss';

export default function CloseBtn({ onClick }) {
  return (
    <button className="btn-close" type="button" onClick={onClick}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 9L1 1M9 1L1 9"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
