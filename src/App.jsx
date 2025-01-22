import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import CurrencyInputBox from "./components/CurrencyInputBox"
import currencydata from "./data/currencydata"
import { BsCurrencyExchange } from 'react-icons/bs'


function App() {

const [amount, setAmount] = useState(0)
const [from, setFrom] = useState("USD")
const [to, setTo] = useState("INR")
const [convertedAmount, setConvertedAmount] = useState(0)
const [isAnimating, setIsAnimating] = useState(false);

const currencyInfo = currencydata(from)

const options = Object.keys(currencyInfo)

const convert = (e) => {
    e.preventDefault()
    setConvertedAmount(amount * currencyInfo[to])
}


return (
    <div
        className="h-screen relative  w-84 flex flex-col justify-center items-center bg-bgImage bg-cover bg-no-repeat"
    >   
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: isAnimating ? 1.5 : 1, opacity: 1 }}
                exit={{ scale: isAnimating ? 1 :   1.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 10, duration: 1 }}
                className="text-5xl font-bold text-white"
            >
                <BsCurrencyExchange />
            </motion.div>
        </AnimatePresence>
        <h1 className="text-4xl py-7 inline-block font-medium text-center text-white"> CURRENCY CONVERTOR</h1>
        <div className="md:w-96 w-72 bg-white rounded-xl">
            <div className="border border-gray-60 rounded-lg p-5  bg-transparent hover:shadow-2xl">
                <form
                    className='flex flex-wrap justify-center'
                >
                    <div className="w-full mb-1 mx-4">
                        <p className="text-xl py-2 font-semibold">Enter the Amount</p>
                        <CurrencyInputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                            
                        />
                    </div>
                    <div className="w-full mt-1 mb-4 mx-4">
                        <p className="text-xl py-2 font-semibold">Converted  Amount</p>
                        <CurrencyInputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <div className="">
                    <button 
                        onClick={() => {setIsAnimating((prev) => !prev); convert()}}
                        className="bg-transparent border-2 border-black  active:transform active:scale-90 group  px-5 py-4 my-2 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                    </div>
                </form>
            </div>
            <div>
            </div>
        </div>
    </div>
);
}

export default App