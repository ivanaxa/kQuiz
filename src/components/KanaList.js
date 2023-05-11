import kana from '../data/kana.json';


const card = {
    margin: '5px',
    border: '.5em solid pink',
    borderRadius: '1em',
    background: 'pink',
    maxWidth: '7em'
};

const container = {
  display: 'grid',
  gridTemplateColumns:'130px 130px 130px 130px 130px',
  margin: 'auto',
  width: '80%'
}

const headerContainer = {
  display: 'grid',
  gridTemplateColumns:'100%',
  maxWidth:"80%",
  margin:'auto',
  textAlign:'left'
}

function getListOfKana(list, type) {
    let simpleList = [];
    for (let set of list){
        if (type.includes(set.type)){
            let combo = set.source
            let array = combo.romaji
            for (let i=0; i < array.length;i++){
                simpleList.push({
                    "romaji":combo.romaji[i],
                    "hiragana": combo.hiragana[i],
                    "katakana":combo.katakana[i],
                    "group": set.id
                })
            }
        }
    }
    return simpleList
}

function createCards(group, list){
    const res = list
    .filter(
        function(entry){
            return entry.group===group;
        }
    )
    .map(
        (entry) =>
            <div style={card} key={entry.romaji}>
                <h2>{entry.hiragana}</h2>
                <h2>{entry.katakana}</h2>
                <h3>{entry.romaji}</h3>
            </div>
    );
    return res;
}

function createContainer(cards, containerKey){
    return(
        <div style={container} key={containerKey}>
            {cards}
        </div>
    )
}

function createHeaderContainer(title, containerKey){
    return(
        <div style={headerContainer} key={containerKey}>
            <h1>{title}</h1>
        </div>
    )
}

function getGroups(list){
    let groups= new Set()
    for (let letter of list){
        groups.add(letter.group)
    }
    return groups
}

function createRow(list, groups, type){
    const rows = []
    for (const g of groups){
        const row = createContainer(createCards(g, list),"row_"+g)
        rows.push(row)
    }
    return rows
}

function KanaList(props){
    const k = kana.list;

    const simpleKanaList = getListOfKana(k, ["simple"]);
    const skgroups = getGroups(simpleKanaList);
    const skl = createRow(simpleKanaList, skgroups)

    const simpleCombinationList =getListOfKana(k, ["combination"]);
    const scgroups = getGroups(simpleCombinationList);
    const scl = createRow(simpleCombinationList, scgroups)

    const tentenList = getListOfKana(k, ["tenten"]);
    const ttgroups = getGroups(tentenList);
    const ttl = createRow(tentenList, ttgroups);

    const handakutenList = getListOfKana(k, ["handakuten"]);
    const hgroups = getGroups(handakutenList);
    const hl = createRow(handakutenList, hgroups);

    const complicatedCombinationList = getListOfKana(k, ['combination tenten', 'combination handakuten']);
    const ccgroups = getGroups(complicatedCombinationList);
    const ccl = createRow(complicatedCombinationList, ccgroups);

    

    return(
        <>
            <div key ="slDiv">
                {createHeaderContainer("Simple List", "slHeader")}
                {skl}
            </div>
            <br></br>

            <div key ="scDiv">
                {createHeaderContainer("Simple Combination List", "scHeader")}
                {scl}
            </div>
            <br></br>

            <div key ="ttDiv">
                {createHeaderContainer("TenTen List", "ttHeader")}
                {ttl}
            </div>
            <br></br>

            <div key ="hDiv">
                {createHeaderContainer("Handakuten List", "hHeader")}
                {hl}
            </div>
            <br></br>    

            <div key ="cDiv">
                {createHeaderContainer("Combination List", "cHeader")}
                {ccl}
            </div>
            <br></br>
        </>

    )
}

export default KanaList;