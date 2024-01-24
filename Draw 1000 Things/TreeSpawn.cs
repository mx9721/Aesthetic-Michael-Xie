using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class TreeSpawn : MonoBehaviour
{
    public GameObject Fir;
    public GameObject Oak;
    public GameObject Palm;
    public GameObject Popular;

    // Start is called before the first frame update
    void Start()
    {
        SpawnTrees();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            Application.Quit();
        }
    }

    void SpawnTrees()
    {
        for (int i = 0; i < 10000; i++)
        {
            int j = Random.Range(0, 3);
            Vector3 spawnPosition = new Vector3(Random.Range(0, 500), 1, Random.Range(0, 500));
            switch(j)
            {
                case 0:
                    Instantiate(Fir, spawnPosition, Quaternion.identity);
                    break;
                case 1:
                    Instantiate(Oak, spawnPosition, Quaternion.identity);
                    break;
                case 2:
                    Instantiate(Palm, spawnPosition, Quaternion.identity);
                    break;
                case 3:
                    Instantiate(Popular, spawnPosition, Quaternion.identity);
                    break;
            }
        }
    }
}
